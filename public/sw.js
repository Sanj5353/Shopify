/**
 * Created by thihara on 8/29/16.
 * 
 * The service worker for displaying push notifications.
 */

//import authServices from "../src/services/auth.services"

 self.addEventListener('push', event => {
    const data = event.data.json()
    console.log('New notification', data)
    
    const options = {
      body: data.body,
    }
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  })
  /*self.addEventListener("push", (e) => {

    const data = e.data?.json();
    
    
    if (data) {
    console.log(data.title);
    console.log(JSON.stringify(data));
    self.registration.showNotification(data.title, {
    body: data.body,
    });
    }
    });

 /*self.addEventListener('push', function(event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }
  
    var data = {};
    if (event.data) {
        data = event.data.json();
    }
    var title = data.title;
    var message = data.message;
    //var icon = "img/FM_logo_2013.png";
  
    //self.clickTarget = data.clickTarget;
  
    event.waitUntil(self.registration.showNotification(title, {
        body: message,
        tag: 'push-demo',
        //icon: icon,
        //badge: icon
    }));
  });*/
  
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close();
  
    if(clients.openWindow){
        event.waitUntil(clients.openWindow(self.clickTarget));
    }
  });
  