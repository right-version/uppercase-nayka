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
      .add({ ...data })
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
    const ref = await db.firestore().collection('projects').get()
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

  async getNodesData(db, project_id) {
    let nodes = []
    let links = []

    let notes = await this.getCollection(db, project_id, 'notes')
    let sources = await this.getCollection(db, project_id, 'sources')
    let labs = await this.getCollection(db, project_id, 'labs')

    notes = notes.map((n) => ({ ...n, type: 'notes' }))
    sources = sources.map((s) => ({ ...s, type: 'sources' }))
    labs = labs.map((l) => ({ ...l, type: 'labs' }))

    const all_documents = [...notes, ...sources, ...labs]

    all_documents.forEach((doc) => {
      let active = false
      if (doc.type === 'labs') {
        if (doc.progress.map((el) => el.checked).some((el) => !el)) {
          active = true
        }
      }
      nodes.push({
        id: doc.id,
        name: doc.title,
        type: doc.type,
        _cssClass: active ? 'labs--active' : doc.type,
        _labelClass: doc.type + 'l',
      })
    })
    all_documents.forEach((doc) => {
      if (doc.links) {
        doc.links.forEach((link) => {
          links.push({
            sid: doc.id,
            tid: link.id,
          })
        })
      }
    })
    return { nodes, links }
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

  async getSemanticInfo(db, project_id) {
    const ref = await this.getCollection(db, project_id, 'sources')
    let documents = []
    ref.forEach((doc) => {
      documents.push(Object.values(doc.cso))
    })
    const x = {}
    documents = documents.flat()
    for (let i = 0, j = documents.length; i < j; i++) {
      x[documents[i]] = (x[documents[i]] || 0) + 1
    }
    return x
  },
}
