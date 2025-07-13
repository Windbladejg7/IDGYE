
export async function enviarCodigo(req, res){
    const {code, language} = req.body;
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "X-RapidApi-Host":"judge0-ce.p.rapidapi.com",
            "X-RapidApi-Key":"08aa8a562bmsh4123493b9fcba15p1fb18cjsn73c42a71dbcb"
        },
        body:JSON.stringify({
          language_id: language,
          source_code: code 
        })
    });
    const {token} = await response.json();
    const result = await obtenerSubmission(token);
    res.json(result);
}

async function obtenerSubmission(token){
    const response = await fetch(`https://ce.judge0.com/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status_id,language_id`, {
        headers:{
            "X-RapidApi-Host":"judge0-ce.p.rapidapi.com",
            "X-RapidApi-Key":"08aa8a562bmsh4123493b9fcba15p1fb18cjsn73c42a71dbcb"
        }
    });
    const datos = await response.json();
    return datos;
}