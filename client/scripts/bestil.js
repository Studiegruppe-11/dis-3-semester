document.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await fetch("/orders/sandwich");
        const sandwich = await response.json();
        const response2 = await fetch("/orders/juice");
        const juice = await response2.json();

        console.log(sandwich, juice);


        
          //document.getElementById("user").innerHTML = result.name;
        
    
      } catch (error) {
          console.log(error);
          
        }


      });


