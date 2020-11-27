// Функций для связывания проекта с back-end частью
export default {
    async getCollection(db, project_id, collection) {
        let documents = []
        const ref = await db
            .firestore()
            .collection('projects')
            .doc(project_id)
            .collection(collection)
            .get()
        ref.forEach((doc) => {
            documents.push({
                id: doc.id,
                ...doc.data(),
            })
        })
        return documents
    },

    async addProject(db, data) {
        const ref = await db
            .firestore()
            .collection('projects')
            .add({ ...data})
        return ref
    },

    async getProjectInfo(db, project_id) {
        const ref = await db
            .firestore()
            .collection('projects')
            .doc(project_id)
            .get()
        return {
            id: ref.id,
            ...ref.data(),
        }
    },

    async getAllProjects(db) {
        let projects = []
        const ref = await db
            .firestore()
            .collection('projects')
            .get()
        ref.forEach((pr) => {
            projects.push({
                id: pr.id,
                ...pr.data(),
            })
        })
        return projects
    },

    async addDocument(db, project_id, collection, data) {
        const ref = await db
            .firestore()
            .collection('projects')
            .doc(project_id)
            .collection(collection)
            .add({ ...data, type: collection })
        return ref
    },

    async deleteDocument(db, project_id, collection, document_id) {
        const ref = await db
            .firestore()
            .collection('projects')
            .doc(project_id)
            .collection(collection)
            .doc(document_id)
            .delete()
        return ref
    },

    async patchDocument(db, project_id, collection, document_id, data) {
        const ref = await db
            .firestore()
            .collection('projects')
            .doc(project_id)
            .collection(collection)
            .doc(document_id)
            .set({
                ...data,
            })
        return ref
    },

    async getDocument(db, project_id, collection, document_id) {
        const ref = await db
            .firestore()
            .collection('projects')
            .doc(project_id)
            .collection(collection)
            .doc(document_id)
            .get()
        return {
            id: ref.id,
            ...ref.data(),
        }
    },
}
