let valores = [];
function enviarForm(){
    let checkbox = document.getElementsByName('checked');
        for (let i = 0; i<checkbox.length; i++)
        {
            if (checkbox[i].checked)
            {
                valores.push(checkbox[i].value);
            }
        }
    }
let btn = document.getElementById("botaoProximo");
btn.addEventListener('click',enviarForm());