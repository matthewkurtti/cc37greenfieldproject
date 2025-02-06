require('dotenv').config({ path: './.env.local' });

const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

const filePath = path.join(__dirname, 'file.type')

const Drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name:'file name saved on google drive',
                mimeType: 'audio/mpeg'
            },
            media: {
                mimeType: 'audio/mpeg',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response.data);
    } catch (error) {
       console.log(error.message) 
    }
    
}

async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: 'file id'
        });
        console.log(response.data, response.status)
    } catch (error) {
        console.log(error.message)
    }
    
}

async function generatePublicUrl() {
    try {
        const fileId = 'file id'
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type:'anyone'
            }
        })

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLinks, webContentLink',
        });
        console.log(result.data);
    } catch (error) {
        console.log(error.message)
    }
}