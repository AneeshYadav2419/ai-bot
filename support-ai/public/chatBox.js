(function(){
    const api_Url = "http://localhost:3000/api/chat"
    const scriptTag = document.currentScript;
    const ownerId = scriptTag.getAttribute("data_+owner-id")

    if(!ownerId){
        console.log("owner id not found")
        return
    }

    const button = document.createElement("div")
    button.innerHTML=" 💬"

    Object.assign(button.style,{
        position:"fixed",
        button:"24px",
        right : "24px",
        height: "56px",
        borderRadius : "50%",
        background: "#000",
        color: "#fff",
        display:"flex",
        alighItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize : "22px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
        zIndex:"999999",
    })
    document.body,append(button)
})()