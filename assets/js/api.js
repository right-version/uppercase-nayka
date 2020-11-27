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
}
