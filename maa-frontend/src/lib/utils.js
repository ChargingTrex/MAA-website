import { clsx } from 'clsx'

export function cn(...inputs) {
  return clsx(inputs)
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncate(str, length = 100) {
  return str.length > length ? str.substring(0, length) + '...' : str
}

export const PHONE_NUMBER = '+91-98765-43210'
export const EMAIL = 'info@maasaraswati.org'
export const ADDRESS = 'Hyderabad, Telangana, India'
export const UPI_ID = 'maasaraswati@upi'
export const BANK_ACCOUNT = {
  name: 'MAA Saraswati Veterinary Hospital',
  accountNumber: '12345678901234',
  ifsc: 'SBIN0001234',
  bankName: 'State Bank of India',
}
