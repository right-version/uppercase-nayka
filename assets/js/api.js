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
}
