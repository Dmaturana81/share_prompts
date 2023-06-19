'use client'
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout ">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick = {handleTagClick}
          />
          )
        )
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText ] = useState('')
  const [searchTimeout, setSearchTimeout ] = useState(null)
  const [searchResults, setSearchResults ] = useState(null)
  const [posts, setPosts] = useState([])


  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return (
      posts.filter(
        (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
        )
      )
  }
  const handleTagClick = (e) => {
    // setSearchText(e)
    const searchResult = filterPrompts(e);
    setSearchResults(searchResult);
  
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPost();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type='text'
          placeholder='Search for tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      { searchResults ? (
          <PromptCardList
            data={searchResults}
            handleTagClick={handleTagClick}
            />
       ) :
      (
        <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed