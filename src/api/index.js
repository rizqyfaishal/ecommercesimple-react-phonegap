import { genericRequest, authenticatedRequest, authenticatedPostImageRequest } from '../request';

export function userRegisterAPI(data) {
  return genericRequest('/auth-register/', 'POST', data);
}

export function getUserProfiles() {
  return authenticatedRequest('/profiles/', 'GET', null);
}

export function getUserContacts() {
  return authenticatedRequest('/contacts/', 'GET', null);
}

export function getAllContacts() {
  return authenticatedRequest('/auth/get-all-contacts-data/', 'GET', null);
}

export function saveContacts(data) {
  return authenticatedRequest('/multiple-contacts/', 'POST', { from_phone_book: false, ...data });
}

export function saveProfileAPI(data) {
  return authenticatedPostImageRequest('/profiles/', 'POST', data);
}

export default function authenticatedAPI(url, method, data) {
  return authenticatedRequest(url, method, data);
}

export function saveEditedProduct(productId, data) {
  return authenticatedRequest(`/products/${productId}/`, 'PUT', data);
}

export function saveProduct(data) {
  return authenticatedRequest('/products/', 'POST', data);
}

export function saveEdittedUser(data, userId) {
  return authenticatedRequest(`/users/${userId}/`, 'PATCH', data);
}

export function getMyDealProducts() {
  return authenticatedRequest('/auth/deal-products/sended/', 'GET', null);
}

export function getProductDetailByUserTarget(productId) {
  return authenticatedRequest(`/auth/deal-products/${productId}/`, 'GET', null);
}

export function saveEdittedAdditionalInformation(data, userId) {
  return authenticatedRequest(`/additional-informations/${userId}/`, 'PATCH', data);
}

export function userAcceptProduct(productId) {
  return authenticatedRequest(`/products/${productId}/accept-product/`, 'PATCH', null)
}

export function userNegotiateProduct(productId) {
  return authenticatedRequest(`/products/${productId}/negotiate-product/`, 'PATCH', null)
}

export function userCancelProduct(productId) {
  return authenticatedRequest(`/products/${productId}/cancel-product/`, 'PATCH', null)
}

export function getUserAcceptedProducts() {
  return authenticatedRequest('/auth/invoices-buyer/', 'GET', null);
}

export function getUserInvoiceProducts() {
  return authenticatedRequest('/auth/my-products/', 'GET', null);
}

export function getUserProductListData() {
  return authenticatedRequest('/auth/my-products/', 'GET', null);
}

export function getUserInvoiceData(productId) { 
  return authenticatedRequest(`/invoices/${productId}`, 'GET', null);
}

export function postImageUpload(imageData) {
  return authenticatedPostImageRequest('/images/', 'POST', imageData);
}

export function userCreateAttachment(data) {
  return authenticatedRequest('/attachments/', 'POST', data);
}

export function userGetDealProductData(productId) {
  return authenticatedRequest(`/products/${productId}/`, 'GET', null)
}

export function saveContactsFromPhoneBooks(data) {
  return authenticatedRequest('/multiple-contacts/', 'POST', { from_phone_book: true, ...data })
}