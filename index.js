var dados = []

function deletaCurso(id) {
    let _confirm = confirm("Deseja excluir esse curso ?")

    if(_confirm){
        for(let i=0; i < dados.length; i++){
            if(dados[i].id == id){
                dados.splice(i,1)
            }
        }

        populaTabela()
    }

}


function editaCurso(id) {
    $("#exampleModal").modal("show")

    dados.forEach((dado) => {
        if(dado.id == id){
            $("#hdID").val(dado.id)
            $("#txtCurso").val(dado.curso)
            $("#txtDescricao").val(dado.descricao)
            $("#urlImagem").val(dado.imagem)
            $("#txtProfessor").val(dado.professor)
            $("#urlAula1").val(dado.aula1)
            $("#urlAula2").val(dado.aula2)
            $("#urlAula3").val(dado.aula3)
            $("#urlAula4").val(dado.aula4)
            $("#dataCurso").val(dado.dataCurso.substr(6,4)+"-"+dado.dataCurso.substr(3,2)+"-"+dado.dataCurso.substr(0,2))
        }
    })



}




function populaTabela() {
    if(Array.isArray(dados)){

        localStorage.setItem("__dados__",JSON.stringify(dados)) 

        $("#tblDados tbody").html("")

        dados.forEach( dado => {
            $("#tblDados tbody").append(`
            
                <tr>
                    <th scope="col">${dado.id}</th>
                    <th scope="col">${dado.curso}</th>
                    <th scope="col">${dado.descricao}</th>
                    <td scope="col"><img src="${dado.imagem}" class="img-thumbnail" alt="${dado.curso}" ></td>
                    <th scope="col">${dado.professor} </th>
                    <td scope="col"> 
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href="${dado.aula1}" class="btn btn-primary" >1</a>
                            <a href="${dado.aula2}" class="btn btn-primary">2</a>
                            <a href="${dado.aula3}" class="btn btn-primary">3</a>
                            <a href="${dado.aula4}" class="btn btn-primary">4</a>
                        </div>
                    </td>
                    <th scope="col">${dado.dataCurso}</th>
                    <th scope="col"><button type="button" onClick="javascript:editaCurso(${dado.id});" class="btn btn-primary">Editar</button></th>
                    <th scope="col"><button type="button" onClick="javascript:deletaCurso(${dado.id});" class="btn btn-danger">Deletar</button></th>
                </tr>
            `)
        })

    }
}



$(function () {

  dados = JSON.parse(localStorage.getItem("__dados__")) ?? []

            if(dados){
                populaTabela()
            }
  
        $('#bntSalvar').on('click',function(){
         
            let _id= $("#hdID").val()
          let curso = $("#txtCurso").val()
         let  descricao = $("#txtDescricao").val()
         let   imagem = $("#urlImagem").val()
          let   professor = $("#txtProfessor").val()
          let    aula1 = $("#urlAula1").val()
          let     aula2 = $("#urlAula2").val()
          let        aula3 = $("#urlAula3").val()
          let         aula4 = $("#urlAula4").val()

          let dataCurso = new Date($("#dataCurso").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })


          let registro = {}

          registro.curso = curso
          registro.descricao = descricao
          registro.imagem = imagem
          registro.professor = professor
          registro.aula1 = aula1
          registro.aula2 = aula2
          registro.aula3 = aula3
          registro.aula4 = aula4
          registro.dataCurso = dataCurso

          if(!_id || _id == "0"){
              registro.id = dados.length + 1
          dados.push(registro)
          }else{
              dados.forEach((dado) => {
                  if (dado.id == _id) {
                      dado.curso = curso
                      dado.descricao = descricao
                      dado.imagem = imagem
                      dado.professor = professor
                      dado.aula1 = aula1
                      dado.aula2 = aula2
                      dado.aula3 = aula3
                      dado.aula4 = aula4
                      dado.dataCurso = dataCurso

                  }
                  })
          }
          

          alert("Curso salvo com sucesso")

          $("#hdID").val("0")
          $("#txtCurso").val("")
          $("#txtDescricao").val("")
          $("#urlImagem").val("")
          $("#txtProfessor").val("")
          $("#urlAula1").val("")
          $("#urlAula2").val("")
          $("#urlAula3").val("")
          $("#urlAula4").val("") 
          $("#dateCurso").val("")
            //LIMPA CAMPO


          populaTabela()
        })
    

})

