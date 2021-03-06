const fp = require('./fp');
const utils = require('./utils');
const EntityValueProvider = require('./entity_value_provider');

/**
 * The augment class provide helpers methods to augment a chatl parsed data
 * tree and make the process of writing adapters easier.
 */
class Augment {

  /**
   * Instantiate a new augment object with the given data.
   * @param {Object} parsedData Chatl parsed data.
   * @param {Boolean} useSynonymsInEntityValueProvider If sets to true, synonyms will be outputed by entity value provider using the `next` method
   */
  constructor(parsedData, useSynonymsInEntityValueProvider=false) {
    this.intents = parsedData.intents || {};
    this.entities = parsedData.entities || {};
    this.synonyms = parsedData.synonyms || {};

    // Let's flatten some stuff right now
    this.synonymsValues = fp.map(
      fp.pipe(fp.prop('data'), fp.map(fp.prop('value'))))(this.synonyms);
    this.entitiesValues = fp.map(fp.instantiate(EntityValueProvider, 
      useSynonymsInEntityValueProvider ? this.synonymsValues : {}))(this.entities);
  }

  /**
   * Retrieve an entity value provider from an entity name.
   * @param {string} name Name of the entity to retrieve.
   * @returns {EntityValueProvider}
   */
  getEntity(name) {
    const provider = this.entitiesValues[name];

    if (!provider) {
      throw new Error(`Could not find an entity with the name: ${name}`);
    }

    return provider;
  }

  /**
   * Retrieve all synonyms values for an entity.
   * @param {string} entity Entity to retrieve
   * @returns {Array} Synonyms values
   */
  getSynonyms(entity) {
    return this.synonymsValues[entity] || [];
  }

  /**
   * This method will generate needed synonyms permutations to replace them by
   * text components in all intents and returns the final result. It will also
   * handle optional synonyms values.
   * @returns {Object} Intents with data processed.
   */
  getIntents() {
    const processIntentData = intentData => fp.append({
      data: fp.reduce((acc, sentence) => {
        const sentenceSynonyms = fp.filter(utils.isSynonym)(sentence);

        // No synonyms, just returns now
        if (sentenceSynonyms.length === 0) {
          return fp.append([sentence])(acc);
        }

        // Get all synonyms values to generate permutations
        // For optional synonyms, add an empty entry.
        const synonymsData = fp.reduce((p, c) => fp.append({
          [c.value]: (c.optional ? [''] : []).concat(this.getSynonyms(c.value)),
        })(p), {})(sentenceSynonyms);
        
        // And for each permutation, replace by text elements
        return fp.append(fp.map(permutation => {
          let idx = 0;

          const parts = fp.reduce((p, c) => {
            if (!utils.isSynonym(c)) {
              return fp.append(fp.clone(c))(p);
            }

            const value = permutation[idx++];

            // Check if it's not an empty value
            if (value) {
              return fp.append({
                type: 'text',
                value,
              })(p);
            }

            return p;
          })(sentence);

          // Remove uneeded whitespaces introduced by optional synonyms
          const strippedParts = fp.reduce((f, part, i) => {
            const p = fp.clone(part);

            // First element
            if (i === 0) {
              p.value = p.value.trimLeft();
            }

            // Last element or the following one starts with a space
            if (i === (parts.length - 1) || parts[i + 1].value[0] === ' ') {
              p.value = p.value.trimRight();
            }

            if (p.value === '') {
              return f;
            }

            return fp.append(p)(f);
          })(parts);

          return strippedParts;
        })(utils.permutate(synonymsData)))(acc);
      })(intentData.data),
    })(intentData);

    return fp.map(processIntentData)(this.intents);
  }

}

module.exports = Augment;
