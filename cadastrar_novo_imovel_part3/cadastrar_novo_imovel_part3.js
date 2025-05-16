let valores = [];
function enviarForm(){
    let checkbox = document.getElementsByName('checked_box');
        for (let i = 0; i<checkbox.length; i++)
        {
            if (checkbox[i].checked)
            {
                valores.push(checkbox[i].value);
            }
        }
    }
let botao = document.getElementById("botaoProximo");
botao.addEventListener('click',enviarForm());

botao.addEventListener('click', () => { window.location.href = "../meus_imoveis/meus_imoveis.html" })
