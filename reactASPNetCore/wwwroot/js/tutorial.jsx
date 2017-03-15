const CommentBox = React.createClass({
    loadComponentFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    getInitalState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        console.log(this.state, "statehere");
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
});

const CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map((comment) => {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

const CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});

const Comment = React.createClass({
    rawMarkup: function () {
        let md = new Remarkable();
        let rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },

    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

//let data = [
//    { id: 1, author: "daniel lo nigro", text: "hello reactjs.net world!" },
//    { id: 2, author: "pete hunt", text: "this is one comment" },
//    { id: 3, author: "jordan walke", text: "this is *another* comment" }
//];

ReactDOM.render(
    <CommentBox url="/comments" pollInterval={2000} />,
    document.getElementById('content')
);