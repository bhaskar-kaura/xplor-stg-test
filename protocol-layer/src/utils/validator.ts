import Ajv from 'ajv';

const ajv = new Ajv();

function validateJson(schema: any, data: any) {
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  if (!isValid) {
    console.warn('[ERROR] Validation failed!', validate.errors);
    return validate.errors;
  }
  return true;
}

export default validateJson;
