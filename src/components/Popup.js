import React from 'react';

const Popup = (props) => {
    React.useEffect(() => {
  window.addEventListener('push', (event) => {
    console.log("event from popup"+ event.data);
  });
});
  return (
    <div >
      <h1>Welcome to the Keydown Listening Component</h1>
    </div>
  );
};

export default Popup;