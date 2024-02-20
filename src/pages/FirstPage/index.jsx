import React, { useState } from 'react';
import {
    useGetFormQuery,
    useAddFormMutation,
    useUpdateFormMutation,
    useDeleteFormMutation,
} from '@/redux/api/FirstApi';
import styles from "./style.module.scss"


const FirstPage = () => {
    const { data: formData, isLoading, isError, isSuccess, refetch } = useGetFormQuery();
    const [addForm] = useAddFormMutation();
    const [updateForm] = useUpdateFormMutation();
    const [deleteForm] = useDeleteFormMutation();
    const [newForm, setNewForm] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        addForm({ userId: 1, title: newForm, completed: false });
        setNewForm('');
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        formData.forEach((post) => {
            updateForm({ ...post, completed: !selectAll });
        });
        setShowModal(true);
        setModalContent(formData);
        refetch();
    };

    const handleCheckboxChange = (post) => {
        updateForm({ ...post, completed: !post.completed });
        setModalContent(post);
        setShowModal(true);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredFormData = formData?.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    let content;
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        content = filteredFormData.map((post) => {
            return (
                <article key={post.id}>
                    <div className={styles.post}>
                        <input
                            type="checkbox"
                            checked={post.completed}
                            id={post.id}
                            onChange={() => handleCheckboxChange(post)}
                        />
                        <label htmlFor={post.id}>{post.title}</label>
                    </div>
                    <button className="btn btn-primary" onClick={() => deleteForm({ id: post.id })}>Delete</button>
                </article>
            );
        });
    } else if (isError) {
        content = <p>Error</p>;
    }

    return (

        <main className={styles.post_container}>
            <div>
                <h1 className={styles.post_heading}>First Api</h1>
                <form onSubmit={handleSubmit} className={styles.form_input}>
                    <div className={styles.new_post}>
                        <label htmlFor="new_todo">Enter a new post item</label>
                        <input
                            className={styles.search_input}
                            type="text"
                            id="new-post"
                            value={newForm}
                            onChange={(e) => setNewForm(e.target.value)}
                            placeholder="Enter new post"
                        />
                    </div>
                    <button className={styles.select_all_btn}>Enter</button>
                </form>
                <div className={styles.form_input}>
                    <label htmlFor="new_todo">Search Post for TITLE</label>
                    <div className={styles.search_container}>
                        <input
                            className={styles.search_input}
                            type="search"
                            placeholder="Search post items"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button className={styles.select_all_btn} onClick={handleSelectAll}>
                        {selectAll ? 'Unselect All' : 'Select All'}
                    </button>
                </div>
                <div className={styles.post_list}>{content}</div>
                {
                    showModal && (
                        <div className={styles.modal}>
                            <div className={styles.modal_content}>
                                {Array.isArray(modalContent) ? (
                                    modalContent.map((item) => (
                                        <div key={item.id}>
                                            <h2>{item.title}</h2>
                                            <p>{item.id}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div key={modalContent.id}>
                                        <h2>{modalContent.title}</h2>
                                        <p>{modalContent.name}</p>
                                    </div>
                                )}
                                <button className={styles.close_modal_btn} onClick={() => setShowModal(false)}>
                                    Close Modal
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </main >

    );
};

export default FirstPage;
