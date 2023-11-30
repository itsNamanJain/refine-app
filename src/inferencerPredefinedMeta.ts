/**
 * This `meta` object is used to define the necessary metadata for inferencer to work with.
 *
 * They will be used to infer the fields of the response of the data provider.
 * Also they will be included in the generated code, making them easily editable after you generate the boilerplate code for your resource.
 */
export const inferencerPredefinedMeta = {
  capablweb_power_bi: {
    getList: {
      fields: ["id", "report_id", "email", "created_at"],
    },
    getOne: {
      fields: ["id", "report_id", "email", "created_at"],
    },
  },
};
