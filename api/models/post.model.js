import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    tags: {
        type: Array,
        default: [],
    },
    commentCount: {
        type: Number,
        default: 0,
    },
     viewsCount: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6GfPQdX1AeKTOmxRmHHqfmidqMV-mZn2izw&s',
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
     user: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});


const Post =  mongoose.model("Post", postSchema);

export default Post;