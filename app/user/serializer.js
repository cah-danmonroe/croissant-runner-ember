import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  pushPayload(modelName, inputPayload) {
    const payload = { data: this.formattedRecord(inputPayload) };
    this._super(modelName, payload);
  },

  normalizeResponse(store, primaryModelClass, payload) {
    payload =  { data: this.formattedRecord(payload) };
    return payload;
  },

  normalizeArrayResponse(store, primaryModelClass, payload) {
    payload =  { data: this.formattedRecords(payload) };
    return payload;
  },

  formattedRecords: function(records) {
    return records.results.map((record) => {
      return this.formattedRecord(record);
    });
  },

  formattedRecord(record) {
    let newRecord = {};
    newRecord.attributes = record;
    newRecord.id = record.objectId;
    newRecord.type = 'user';
    return newRecord;
  }
});
