window.onload=function(){
    invisible_div();
    var size_price=0;               // initialization of all variables for the price calculation
    var crust_price=0;
    var meat_price=0;
    var tax=0;
    var total=0;
    var grand_total=0;
    function showError(msg) {           // Function to show error message when validation fails
        document.getElementById('errors').classList.remove('hidden');
        document.getElementById('error').innerHTML = 'ERROR: ' + msg;
    }
    function hiddenError() {
        document.getElementById('errors').classList.add('hidden');
        document.getElementById('error').innerHTML = '';
    }
    document.getElementById('street').onblur=function(){            //Street Function
        var street=document.getElementById('street').value;
        hiddenError();
        if(validator.isEmpty(street))
        {
            showError('Street can not be Empty!');
            street.focus;
            return false;
        }
        else
        {
            document.getElementById('address_show_container').style.visibility='visible';    
        }
        document.getElementById('street_show').innerHTML="Street Address: "+street;
        document.getElementById('street_show').style.display="block";   
    }
    
    document.getElementById('apartment').onblur=function(){             // Apartment Function
        var apartment=document.getElementById('apartment').value;
        hiddenError();
        if(validator.isEmpty(apartment))
            {
            showError('Apartment can not be Empty!');
            return false;
            }
        document.getElementById('apartment_show').innerHTML="Apartment: "+apartment;
        document.getElementById('apartment_show').style.display="block";
    }
    
     document.getElementById('city').onblur=function(){                  // City Function
         var city=document.getElementById('city').value;
         hiddenError();
        if(validator.isEmpty(city))
            {
            showError('City can not be Empty!');
            return false;
            }
         document.getElementById('city_show').innerHTML="City: "+city;
         document.getElementById('city_show').style.display="block";
    }
     
     document.getElementById('province').onblur=function(){                 // Province Function for calculating Taxes according to province of the customer.
         var province=document.getElementById('province').value;
         hiddenError();
        if(validator.isEmpty(province))
            {
            showError('Province can not be Empty!');
            return false;
            }
         if(province=='ON')
         {
             tax=tax+(13/100);
         }
         else if(province=='QC')
         {
             tax=tax+(11/100);
         }
         else if(province=='MB')
         {
             tax=tax+(10/100);
         }
         else if(province=='SK')
         {
             tax=tax+(15/100);
         }
         document.getElementById('province_show').innerHTML="Province: "+province;
         document.getElementById('province_show').style.display="block";
     }
    document.getElementById('phonenumber').onblur=function(){                       // Phone Number Function to validate phone number
        var phonenumber=document.getElementById('phonenumber').value;
        var filter=/^\d{10}$/;
        hiddenError();
        if(validator.isEmpty(phonenumber))              // if phone number empty
        {
            showError('Phone Number can not be Empty!');
        }
        if(!phonenumber.match(filter))              // if phone number wrong i.e. not with 10 numbres.
        {
            showError('Please Enter Correct Phone Number!');
            phonenumber.focus;
            return false;
        }
        document.getElementById('phonenumber_show').innerHTML="Phone Number: "+phonenumber;
        document.getElementById('phonenumber_show').style.display="block";
    }
    document.getElementById('e-mail').onblur=function(){                        // Function to validate E-mail of the user
        var email=document.getElementById('e-mail').value;
        var filter_mail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        hiddenError();
        if(validator.isEmpty(email))                            // if e-mail empty
        {
            showError('E-mail can not be Empty!');
        }
        if(!email.match(filter_mail))                       // if e-mail without @ and .
        {
            alert("Please Enter correct E-mail!");
            email.focus;
            return false;
        }
        document.getElementById('email_show').innerHTML="E-mail: "+email;
        document.getElementById('email_show').style.display="block";
    }
    document.getElementById('submit_address_information').onclick=function(){       //  Submit function
        var filter=/^\d{10}$/;
        var filter_mail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var street=document.getElementById('street').value;
        var apartment=document.getElementById('apartment').value;
        var city=document.getElementById('city').value;
        var province=document.getElementById('province').value;
        var phonenumber=document.getElementById('phonenumber').value;
        var email=document.getElementById('e-mail').value;
        hiddenError();
        if(!phonenumber.match(filter))
        {
            alert("Please Enter correct PhoneNumber!");
        }
        if(!email.match(filter_mail))
        {
            alert("Please Enter correct E-mail!");
        }
        if(validator.isEmpty(street)&&validator.isEmpty(apartment)&&validator.isEmpty(city)&&validator.isEmpty(province)&&validator.isEmpty(phonenumber)&&validator.isEmpty(email))
        {
            alert("One or More fields are Empty!");
            showError('One or More fields can not be Empty!');
        }
        else
        {
            document.getElementById('size_div').style.visibility='visible';
            document.getElementById('title').style.visibility='visible';  
        }
    } 
    
    document.getElementById('size_select').onclick=function(){              // Function for getting the Size of the Pizza from Order Page
        document.getElementById('crust_div').style.visibility='visible';
        var size=getSizeVal(document.getElementById('size_select'), 'size');
        if(size=='Small')
            size_price=5.0;
        else if(size=='Medium')
            size_price=10.0;
        else if(size=='Large')
            size_price=15.0;
        else if(size=='X-Large')
            size_price=20.0; 
        document.getElementById('size_data').innerHTML="Pizza Size:"+size;
        document.getElementById('size_data').style.display="block";   
    }
    
    document.getElementById('crust_select').onclick=function(){     // Function for getting the Crust of the Pizza from Order Page
        document.getElementById('sauce_div').style.visibility='visible';
        var crust=getCrustVal(document.getElementById('crust_select'),'crust');
        if(crust=='Stuff Crust')
        {
            crust_price=crust_price+2;
        }
        document.getElementById('crust_data').innerHTML="Crust:"+crust;
        document.getElementById('crust_data').style.display="block"; 
    }
    
    document.getElementById('sauce_select').onclick=function(){         // Function for getting the Sauce of the Pizza from Order Page
        document.getElementById('meat_div').style.visibility='visible';
        var sauce=getSauceVal(document.getElementById('sauce_select'),'sauce');
        document.getElementById('sauce_data').innerHTML="Sauce Size:"+sauce;
        document.getElementById('sauce_data').style.display="block"; 
    } 
    
    
    document.getElementById('submit_meat_toppings').onclick=function(){     // Function for getting multiple toppings for a Pizza from Order Page
        document.getElementById('vegi_div').style.visibility='visible';
        document.getElementById('submit_meat_toppings').disabled=true;
        var result='';
        var selected_meat=document.getElementsByName('meat');
        for(var i=0;i<selected_meat.length;i++)
        {
            var checkedMeat=selected_meat[i].checked;           //getting selected Toppings
            if(checkedMeat)
            {
                result+=selected_meat[i].value+" ";         //adding space after every toppping's name so, i can split it and can see that how many toppings are selected
            }
        }
        var top=result.split(" ");                  // splitting toppings with space. So, i can count price of toppings,
        if(top.length>1)                    // First topping is free. so if topping is more than one, then it will do in this function.
        {
            for(var i=0;i<top.length-1;i++)
            {
                meat_price=meat_price+0.5;
            }
            meat_price=meat_price-0.5;
        }
        var showData="Meat Toppings:"+result;
        document.getElementById('Meat_data').innerHTML=showData;
        document.getElementById('Meat_data').style.display="block"; 
        var numbers_of_pizza=document.getElementById('number_of_pizza').value;
        document.getElementById('number_data').innerHTML=numbers_of_pizza;
        document.getElementById('number_data').style.display="block";
        if(numbers_of_pizza>=1)                             // calculating price for multiple pizzas.
            {
                var add_pizza_cost=(total_price()*numbers_of_pizza).toFixed(2);
                document.getElementById('total_data').innerHTML="Total= $"+add_pizza_cost;
                document.getElementById('total_data').style.display="block";
                var add_tax_cost=(count_tax()*numbers_of_pizza).toFixed(2);
                document.getElementById('tax_data').innerHTML="Tax= $"+add_tax_cost;
                document.getElementById('tax_data').style.display="block";
                var total_cost=Number(add_pizza_cost) + Number(add_tax_cost);
                document.getElementById('grandtotal_data').innerHTML="Grand Total= $"+total_cost;
                document.getElementById('grandtotal_data').style.display="block";
            }      
    }
     
    function total_price(){                             // function for calculating total price i.e. subtotal
        total=size_price+crust_price+meat_price;
        return total;
    }
    function count_tax(){                           // function for calculating tax
        var temp=total_price();
        var total_tax=(temp)*tax;
        return total_tax;
    }
   
}

var validator={                    // validator for empty textbox.
    isEmpty:function (string) {
        return string.trim() === "";
    } 
};
function invisible_div(){
    document.getElementById('address_show_container').style.visibility='hidden';
    document.getElementById('size_div').style.visibility='hidden';
    document.getElementById('crust_div').style.visibility='hidden';
    document.getElementById('sauce_div').style.visibility='hidden';
    document.getElementById('title').style.visibility='hidden';
    document.getElementById('meat_div').style.visibility='hidden';
    document.getElementById('vegi_div').style.visibility='hidden';
    
}
function getSizeVal(form,nameofsize){               // function to get value of size from the radio button group
    var size;
    var radios=form.elements[nameofsize];
    for(var i=0;i<radios.length;i++)
    {
        if(radios[i].checked)
        {
            size=radios[i].value;
            break;
        }
    }
    return size;
}
function getCrustVal(form,nameofcrust){                 // function to get vlue of crust from radio button group
    var crust;
    var radios=form.elements[nameofcrust];
    for(var i=0;i<radios.length;i++)
    {
        if(radios[i].checked)
        {
            crust=radios[i].value;
            break;
        }
    }
    return crust;
}
function getSauceVal(form,nameofsauce){                 // function to get value of sauce from radio button group
    var sauce;
    var radios=form.elements[nameofsauce];  
    for(var i=0;i<radios.length;i++)
    {
        if(radios[i].checked)
        {
            sauce=radios[i].value;
            break;
        }
    }
    return sauce;
}