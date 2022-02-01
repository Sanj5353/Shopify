const convertedVapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY
var applicationServerPublicKey = 'BNtVHIU0jcdYoUCrv9TqphnnTUPg30d59GzFqbvRO_J85N0ox0uefTJgd-aa_5X4LRLxyfOH5JkTplStA1SiGeM';
var url = 'http://localhost:8088/push/';



function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")
  console.log("base64 : " + base64);
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray}
async function sendSubscription(subscription) {
    console.log("send sub "+JSON.stringify(subscription));
  return await fetch(url+'subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }
      console.log("convertedVapidKey : "+ applicationServerPublicKey);
      registration.pushManager.getSubscription().then(function(existedSubscription) {
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request.')
          registration.pushManager.subscribe({
            applicationServerKey: applicationServerPublicKey,
            userVisibleOnly: true,
          }).then(function(newSubscription) {
            console.log('New subscription added.')
            sendSubscription(newSubscription)
            //unsubscribe()
          }).catch(function(e) {
            console.log("exception is " + JSON.stringify(e));
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
            } else {
              console.error('An error ocurred during the subscription process.', e)
            }
          })
        } else {
          console.log('Existed subscription detected.')
          sendSubscription(existedSubscription)
          //unsubscribe()
        }
      })
    })
      .catch(function(e) {
        console.error('An error ocurred during Service Worker registration.', e)
      })
  }
}

export function unsubscribe() {
  console.log("calling unsubscribe");
  var endpoint = null;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }
      console.log("convertedVapidKey : "+ applicationServerPublicKey);
      registration.pushManager.getSubscription().then(function(existedSubscription) {

        if (existedSubscription) {
          endpoint = existedSubscription.endpoint;
          return existedSubscription.unsubscribe();
      }

      })
      .catch(function(error) {
        console.log('Error unsubscribing', error);
    })
    .then(function() {
        removeSubscriptionFromServer(endpoint);

        console.log('User is unsubscribed.');

    });
    
    }).catch(function(e) {
      console.error('An error ocurred during Service Worker registration.', e)
    })
    

}
}

function removeSubscriptionFromServer(endpoint) {
  /*$.ajax({
      type: 'POST',
      url: url+'unsubscribe',
      data: {endpoint: endpoint},
      success: function (response) {
          console.log('Unsubscribed successfully! ' + JSON.stringify(response));
      },
      dataType: 'json'
  });*/

  //console.log("send sub "+JSON.stringify(subscription));
  return fetch(url+'unsubscribe', {
    method: 'POST',
    body: endpoint ,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function displayMsg() {
  if ('serviceWorker' in navigator) {
navigator.serviceWorker.addEventListener('message', event => {
  console.log("mesg new"+event.data.msg, event.data.url);
});
  }
}

