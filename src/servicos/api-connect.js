import generateUrlS3 from "./generateUrlS3";

const BASE_URL =
  "http://curso-serverless2-api-1921475182.us-east-1.elb.amazonaws.com";

function buildFetchObj(metodo, contentType, body) {
  return {
    method: metodo,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "PUT,POST,GET",
    },
    body: body,
  };
}

async function criaRegistro(novoRegistro) {
  const fetchObj = buildFetchObj(
    "POST",
    "application/json",
    JSON.stringify(novoRegistro)
  );
  try {
    const res = await fetch(`${BASE_URL}/alunos`, fetchObj);
    return res.json();
  } catch (erro) {
    return erro;
  }
}

async function enviaArquivoViaURL(url, file) {
  const fetchObj = buildFetchObj("PUT", "text/csv; charset=utf-8", file);

  try {
    const response = await fetch(url, fetchObj);

    if (response.statusCode === 200) return "Upload do arquivo concluido";

    return "Falha no upload";
  } catch (error) {
    return error;
  }
}

async function geraPresignURL(fileKey) {
  return await generateUrlS3(fileKey);
}

export { criaRegistro, enviaArquivoViaURL, geraPresignURL };
