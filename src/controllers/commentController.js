const Comment = require('../models/Comment');

module.exports = {
  getAll: (req, res) => {
    Comment.find()
      .then(data => res.send({ data, message: null }))
      .catch(err => res.status(500).send({ message: `Server error: ${err}` }));
  },

  createComment: (req, res) => {
    if (!req.body.content) res.status(400).send({ message: 'Comment content can not be empty' });

    const comment = new Comment({
      content: req.body.content,
      createdAt: new Date(),
    });

    comment.save()
      .then(data => res.send({ data, message: 'Comment added successfully!' }))
      .catch(err => res.status(500).send({ message: `Server error: ${err}` }));
  },

  updateComment: (req, res) => {
    if (!Object.keys(req.body).length) res.status(400).send({ message: 'Comment content can not be empty' });

    Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((data) => {
        if (!data) res.status(404).send({ message: 'Comment not found!' });

        res.send({ data, message: 'Comment updated successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') res.status(404).send({ message: 'Comment not found!' });

        res.status(500).send({ message: 'Error updating comment!' });
      });
  },

  deleteComment: (req, res) => {
    Comment.findByIdAndRemove(req.params.id)
      .then((data) => {
        if (!data) res.status(404).send({ message: 'Comment not found!' });

        res.send({ message: 'Comment deleted successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') res.status(404).send({ message: 'Comment not found!' });

        res.status(500).send({ message: 'Could not delete comment!' });
      });
  },
};
