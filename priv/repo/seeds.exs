defmodule Seeds do
  alias Tasksmanager.Repo
  alias Tasksmanager.Users.User
  alias Tasksmanager.Tasks.Task

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", email: "alice@gmail.com", password_hash: p })
    b = Repo.insert!(%User{ name: "bob", email: "bob@gmail.com", password_hash: p })
    c = Repo.insert!(%User{ name: "carol", email: "carol@gmail.com", password_hash: p })
    d = Repo.insert!(%User{ name: "dave", email: "dave@gmail.com", password_hash: p })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, title: "Work" , description: "Complete Work"})
    Repo.insert!(%Task{ user_id: b.id, title: "School" , description: "Complete School"})
    Repo.insert!(%Task{ user_id: b.id, title: "Office" , description: "Complete Office"})
    Repo.insert!(%Task{ user_id: c.id, title: "Shopping", description: "Complete Shopping" })
    Repo.insert!(%Task{ user_id: d.id, title: "Friends" , description: "Complete Friends"})
  end
end

Seeds.run
