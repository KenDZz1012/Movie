import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Breadcrumb } from '../components/Search/Breadcrumb'
import SearchArea from '../components/Search/MovieArea'
import Newsletter from '../components/Search/Newsletter'
import SearchIndex from '../components/Search'
const Search = ({ match }) => {
    return (
        <div>
            <Header />
            <main>
                <SearchIndex
                    match={match}
                />
            </main>
            <Footer />
        </div>
    )
}

export default Search