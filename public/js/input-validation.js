
let valName = document.forms['apply']['clientName'];
let valEmail = document.forms['apply']['clientEmail'];
let valPhone = document.forms['apply']['clientPhone'];
let valMessage = document.forms['apply']['clientMessage'];

let nameValidation = document.getElementById('clientNameForm');
let emailValidation = document.getElementById('clientEmailForm');
let phoneValidation = document.getElementById('clientPhoneForm');
let MessageValidation = document.getElementById('clientMessageForm');

let message = '<div class="text-danger">Campo requerido</div>';
let messageEmail = '<div class="text-danger">Debe ser un correo valido</div>';

document.getElementById('clientName').onkeyup = (event) => validatePassword(event, 1);
document.getElementById('clientEmail').onkeyup = (event) => validatePassword(event, 2);
document.getElementById('clientPhone').onkeyup = (event) => validatePassword(event, 3);
document.getElementById('clientMessage').onkeyup = (event) => validatePassword(event, 4);

function validateForm(event) {
  let resultType1 = errors(valName, nameValidation);
  let resultType2 = errors(valEmail, emailValidation);
  let resultType3 = errors(valPhone, phoneValidation);
  let resultType4 = errors(valMessage, MessageValidation);

  event.preventDefault();

  if(!resultType1) return;

  if(!resultType2) return;

  if(!resultType3) return;

  if(!resultType4) return;
  sendInfo();
}

let validatePassword = (event, type) =>{

  let self = event.srcElement;

  if(type === 1) return errors(self, nameValidation);
  if(type === 2) return errors(self, emailValidation);
  if(type === 3) return errors(self, phoneValidation);
  if(type === 4) return errors(self, MessageValidation);

}

let errors = (data, type) => {
  let self = data;
  let rexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (self.value === '') {
    type.innerHTML = message;
    return;
  }

  if(self.name === 'clientEmail'){
    if(!rexEmail.test(self.value)){
      type.innerHTML = messageEmail;
      return;
    }
  }
  
  type.innerHTML = '';
  return true;
}

let sendInfo = () => {
  let url = 'http://localhost:4000/api/create-email';

  let data = { 
    name: valName.value, 
    message: valMessage.value, 
    phone: valPhone.value, 
    mail: valEmail.value, 
    subject: 'HELLO TEAM-BITE' 
  };
  
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => cleanInput())
  .catch(error => console.error('Error:', error))
 
}


let cleanInput = () => {
  $('#alertModal').modal('show');
  valName.value = ''
  valMessage.value = ''
  valPhone.value = ''
  valEmail.value = ''
}