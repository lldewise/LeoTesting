const documentType = filename => {
  const type = filename.split('.').pop();
  return type;
};

export default documentType;
