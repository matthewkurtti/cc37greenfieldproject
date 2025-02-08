require('dotenv').config({ path: './.env.local' });

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const Drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

async function uploadFile(filePath, fileName) {
    try {
        const response = await Drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: 'audio/mpeg'
            },
            media: {
                mimeType: 'audio/mpeg',
                body: fs.createReadStream(filePath)
            }
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

async function deleteFile(fileId) {
    try {
        const response = await Drive.files.delete({
            fileId: fileId
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
}

async function generatePublicUrl(fileId) {
    try {
        await Drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        const result = await Drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = {
    uploadFile,
    deleteFile,
    generatePublicUrl
};