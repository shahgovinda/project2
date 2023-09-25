const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')



function promptForName() {
    do {
        name = prompt('Enter Your Name (between 5 and 14 characters): ');
    } while (!name || name.length < 5 || name.length > 14);
    
    

    // Establish a connection to the server with the username
    const socket = io('/', {
        query: {
            username: name
        }
    });
}

// Call the promptForName function when the page loads
promptForName();


textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

// Add an event listener for the send button click
sendButton.addEventListener('click', () => {
    sendMessage(textarea.value);
});

function sendMessage(message) {

         // Trim the message to remove leading and trailing spaces
    message = message.trim();

    
    if (message.length === 0) {
        // Do not send empty messages
        return ;
    }
    let msg = {
        user: name,
        message: message.trim()

    }
// Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
 
 // Send to server 
    socket.emit('message', msg)

}




function appendMessage(msg, type) {


/* new chat gpt code for  fixing of overlapping the message*/
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
   
    messageArea.appendChild(mainDiv)
}



// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
let mediaStream = null;



 /* time stamp code here */
 
function appendMessage(msg, type) {
    // Create a new message div
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    // Create a timestamp element and format the current time
    let timestampSpan = document.createElement('span');
    let now = new Date();



     // Format the timestamp as "day, month day, year, hour:minute AM/PM" (e.g., "Monday, September 12, 2023, 3:45 PM")
     let timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
     let timeString = now.toLocaleDateString(undefined, timeOptions);



     
    // Set the timestamp text and add it to the message div
    timestampSpan.textContent = timeString;
    timestampSpan.classList.add('timestamp');
    mainDiv.appendChild(timestampSpan);

    // Create the message content
    let messageContent = document.createElement('p');
    messageContent.textContent = msg.message;

    // Create the user name
    let userName = document.createElement('h4');
    userName.textContent = msg.user;

    // Add the user name, message content, and timestamp to the message div
    mainDiv.appendChild(userName);
    mainDiv.appendChild(messageContent);

    // Append the message div to the message area
    messageArea.appendChild(mainDiv);

    // Scroll to the bottom of the message area
    scrollToBottom();
}








// Function to append a new message with animation
function appendMessageWithAnimation(msg, type) {
  const mainDiv = document.createElement('div');
  const className = `message ${type}`;
  mainDiv.classList.add(className);

  const markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;

  // Apply the animation when the message is added
  mainDiv.style.animation = 'fadeIn 0.5s ease-out';

  messageArea.appendChild(mainDiv);
  scrollToBottom();
}

// Function to scroll to the bottom of the message area
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

// Example usage:
// You can call appendMessageWithAnimation when a new message arrives
// For example, when you receive a message from the server:

appendMessageWithAnimation(newMessage, 'incoming');
















