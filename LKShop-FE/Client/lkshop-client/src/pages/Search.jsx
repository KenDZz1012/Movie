import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Breadcrumb } from '../components/Search/Breadcrumb'
import SearchArea from '../components/Search/MovieArea'
import Newsletter from '../components/Search/Newsletter'
import SearchIndex from '../components/Search'
import HeaderTwo from '../components/HeaderTwo'
const Search = ({ match }) => {
    return (
        <div>
            <HeaderTwo />
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