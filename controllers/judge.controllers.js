
export async function enviarCodigo(req, res){
    const {code} = req.body;
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "X-RapidApi-Host":"judge0-ce.p.rapidapi.com",
            "X-RapidApi-Key":"13abcef35amsh45dad28498a63dfp140007jsnac3604e3c55f"
        },
        body:JSON.stringify({
          language_id:63,
          source_code:code 
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
            "X-RapidApi-Key":"13abcef35amsh45dad28498a63dfp140007jsnac3604e3c55f"
        }
    });
    const datos = await response.json();
    return datos;
}