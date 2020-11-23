export const eventsToDispatch = {
    THEME_CHANGED: 'THEME_CHANGED'
};
  
const dispatchEvent = (event, data) => window.dispatchEvent(new CustomEvent(event, { detail: data }));
  
export default dispatchEvent;
  