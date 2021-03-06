// @flow
import * as _ from "lodash";
import axios from 'axios';

import type {Photography} from "../../components/photography/Model";

function getInfo() {
    var info = [];
    axios
        .get("https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/")
        .then(data => {
            const post = data.data.posts;
        
            for (let index = 0; index < post.length; index++) {
                info.push(post[index].featured_image);
                //console.log(post.length);
        }
        
    }).catch(err => console.log(err.message)); //eslint-disable-line
    return info;
}

/*axios.get()
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
*/

const photos = getInfo();

const albums = _.groupBy(photos, "album");
const api: Photography = {
    photos,
    albums,
    album: (album: string) => albums[album]
};

export default api;
