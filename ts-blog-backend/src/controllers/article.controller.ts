import * as express from "express";

import Article from "../models/article";
import { IArticle } from "../interfaces/article.interface";

const createArticle = async (req: express.Request, res: express.Response) => {
	try {
		const article:IArticle = new Article({
			...req.body,
			author: req.body.userObject._id
		});
		await article.save()
		res.status(201).send({'article':article});
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const getMyArticles = async (req: express.Request, res: express.Response) => {
	try {
		const articles = await Article.find({author: req.body.userObject._id})
		res.status(200).send(articles);
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const getArticle = async (req: express.Request, res: express.Response) => {
	try {
		const articles = await Article.find({_id: req.params.id}).select('_id tags title description content').populate('author', 'name')
		res.status(200).send(articles);
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

//TODO: Fix logic
const updateArticle = async (req: express.Request, res: express.Response) => {
	try {
		if(req.body.userObject._id.toString() === req.body.author._id.toString()) {
			console.log("inside else");
			const updatedArticle: IArticle = await Article.findOneAndUpdate({ _id: req.body._id}, {
				title: req.body.title,
				description: req.body.description,
				content: req.body.content
			})
			res.status(200).send("Updated");
		} else {
			res.status(400).send("Only the author can update this article");
		}
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

//TODO: Fix logic
const deleteArticle = async (req: express.Request, res: express.Response) => {
	try {
		if(req.body.userObject._id.toString() === req.body.author._id.toString()) {
			console.log("inside else");
			const updatedArticle: IArticle = await Article.findOneAndDelete({ _id: req.body._id})
			res.status(200).send("Deleted");
		} else {
			res.status(400).send("Only the author can delete this article");
		}
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const getAllArticles = async (req: express.Request, res: express.Response) => {
	try {
		const articles = await Article.find({}).select('title author').populate('author', 'name')
		res.status(200).send(articles);
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};



const _ = {
	createArticle,
	getMyArticles,
	getArticle,
	updateArticle,
	deleteArticle,
	getAllArticles,
}

export default _;