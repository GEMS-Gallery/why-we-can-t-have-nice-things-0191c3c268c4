export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const BlogPost = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'timestamp' : Time,
  });
  const Result = IDL.Variant({ 'ok' : BlogPost, 'err' : IDL.Text });
  const Image = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'addGalleryImage' : IDL.Func([IDL.Text, IDL.Opt(IDL.Text)], [IDL.Nat], []),
    'createBlogPost' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], []),
    'getBlogPost' : IDL.Func([IDL.Nat], [Result], ['query']),
    'getBlogPosts' : IDL.Func([], [IDL.Vec(BlogPost)], ['query']),
    'getGalleryImages' : IDL.Func([], [IDL.Vec(Image)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
