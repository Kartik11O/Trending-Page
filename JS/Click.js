$(".switch").on('click' , ()=>{
    $("#btn-Wapper").addClass('Click-Open')
    $("#btn-Wapper").toggleClass('Click-close')

    



        $("#1").toggleClass('A')
        $("#2").toggleClass('B')
        $("#3").toggleClass('C')
        $("#4").toggleClass('D') 
       let UL = document.getElementById("UL99")
        if(UL.style.display != 'flex'){
            UL.style.display = "flex"
        }

        else{
            UL.style.display = "none"
        }
 
})