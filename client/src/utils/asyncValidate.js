export const asyncValidate = async (formValues, schema) => {
  try {
    await schema.validate(formValues, { abortEarly: false });
    return {};
  } catch (errors) {
    throw errors.inner.reduce(
      (errors, err) => ({
        ...errors,
        [err.path]: err.message,
      }),
      {}
    );
  }
};
