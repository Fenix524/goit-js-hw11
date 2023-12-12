import Notiflix from 'notiflix';

export function showError(text) {
  Notiflix.Notify.failure(text);
}
export function showMassage(text) {
  Notiflix.Notify.info(text);
}