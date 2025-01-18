// import library ทั้งหมดผ่าน firebase-admin เข้ามา
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getDatabase } = require('firebase-admin/database')
const { getAuth } = require('firebase-admin/auth')

initializeApp({
  projectId: 'foodiehub-3512f',
})

const db = getFirestore()
const auth = getAuth()

module.exports = {
  db,
  auth,
}