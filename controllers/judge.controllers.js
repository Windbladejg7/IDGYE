
export async function enviarCodigo(req, res){
    const {code} = req.body;
    console.log(code);
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
    const token = await response.json();
    console.log(token);
    res.json(token);
}