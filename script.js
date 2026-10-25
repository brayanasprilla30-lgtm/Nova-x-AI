const form=document.getElementById('form'),input=document.getElementById('input'),chat=document.getElementById('chat'),send=document.getElementById('send'),clearBtn=document.getElementById('clearBtn');

function addMessage(text,role){const row=document.createElement('div');row.className=`message ${role}`;const b=document.createElement('div');b.className='bubble';b.textContent=text;row.appendChild(b);chat.appendChild(row);chat.scrollTop=chat.scrollHeight;return b}
function addWelcome(){chat.innerHTML='<div class="welcome"><div class="big-logo">✦</div><h1>Hola, soy NOVA</h1><p>Tu asistente de inteligencia artificial.</p></div>'}

form.addEventListener('submit',async e=>{
 e.preventDefault(); const text=input.value.trim(); if(!text)return;
 document.querySelector('.welcome')?.remove(); addMessage(text,'user'); input.value=''; send.disabled=true;
 const thinking=addMessage('NOVA está pensando…','assistant');
 try{
   const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text})});
   const data=await r.json(); thinking.textContent=data.reply||data.error||'No pude responder.';
 }catch(err){thinking.textContent='No pude conectarme con NOVA. Revisa que el servidor esté encendido.'}
 send.disabled=false; input.focus();
});
clearBtn.addEventListener('click',addWelcome);