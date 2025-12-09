import axios from 'axios';
const FIREBASE_BASE_URL = 'https://memelab-battles-default-rtdb.firebaseio.com/';

export async function storeUser(userData) {
    try{
        // Store user under its own id so we can delete by id later
        if (!userData || !userData.id) {
            console.warn('storeUser: userData missing id, using POST fallback');
            await axios.post(FIREBASE_BASE_URL + "/users.json", userData);
            return;
        }
        await axios.put(FIREBASE_BASE_URL + `/users/${userData.id}.json`, userData);
    }
    catch (error) {
        console.error("Error storing user:", error);
    }
}

export async function getUser(){
    try {
        const response = await axios.get(FIREBASE_BASE_URL + "/users.json");
        const data = response.data;
        if (!data) return [];

        // Data will be an object where keys are ids
        return Object.keys(data).map((key) => {
            const item = data[key];
            // Ensure id exists. If not, attach key.
            return {
                id: item.id ? String(item.id) : String(key),
            };
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

export async function deleteUser(userId){
    try {
        await axios.delete(FIREBASE_BASE_URL + `/users/${userId}.json`);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

export async function storeMeme(memeData) {
    try{
        // Store meme under its own id so we can delete by id later
        if (!memeData || !memeData.id) {
            console.warn('storeMeme: memeData missing id, using POST fallback');
            await axios.post(FIREBASE_BASE_URL + "/memes.json", memeData);
            return;
        }
        await axios.put(FIREBASE_BASE_URL + `/memes/${memeData.id}.json`, memeData);
    } catch (error) {
        console.error("Error storing meme:", error);
    }
}

export async function getMemes(){
    try {
        const response = await axios.get(FIREBASE_BASE_URL + "/memes.json");
        const data = response.data;
        if (!data) return [];
        // Data will be an object where keys are ids
        return Object.keys(data).map((key) => {
            const item = data[key];
            // Ensure id exists. If not, attach key.
            return {
                id: item.id ? String(item.id) : String(key),
            };
        });
    } catch (error) {
        console.error("Error fetching memes:", error);
    }
}

export async function storeGameSession(sessionData) {
    try {
        // Store game session under its own id
        if (!sessionData || !sessionData.id) {
            console.warn('storeGameSession: sessionData missing id, using POST fallback');
            await axios.post(FIREBASE_BASE_URL + "/gameSessions.json", sessionData);
            return;
        }
        await axios.put(FIREBASE_BASE_URL + `/gameSessions/${sessionData.id}.json`, sessionData);
    } catch (error) {
        console.error("Error storing game session:", error);
    }
}

export async function getGameSessions() {
    try {
        const response = await axios.get(FIREBASE_BASE_URL + "/gameSessions.json");
        const data = response.data;
        if (!data) return [];
        // Data will be an object where keys are ids
        return Object.keys(data).map((key) => {
            const item = data[key];
            return {
                id: item.id ? String(item.id) : String(key),
                ...item,
            };
        });
    } catch (error) {
        console.error("Error fetching game sessions:", error);
    }
}