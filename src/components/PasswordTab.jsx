const PasswordTab = () => {
  return (
    <section className="flex flex-col space-y-6">
      <div>
        <h2 className="text-lg font-bold">パスワード変更</h2>
        <p className="text-neutral-500 text-sm">セキュリティのため、定期的にパスワードを変更することをおすすめします。</p>
      </div>

      <fieldset className="fieldset space-y-4">
        <div>
          <label htmlFor="" className="label text-sm">お名前</label>
          <input type="password" placeholder="現在のパスワードを入力"  className="input w-full"/>
        </div>

        <div>
          <label htmlFor="" className="label text-sm">新しいパスワード</label>
          <input type="password" placeholder="新しいパスワードを入力（８文字以上）" className="input w-full"/>
        </div>

        <div>
          <label htmlFor="" className="label text-sm">新しいパスワード（確認）</label>
          <input type="password" placeholder="新しいパスワードを再入力" className="input w-full"/>
        </div>
      </fieldset>

      <button className="btn btn-primary">パスワードを変更</button>
    </section>
  )
}

export default PasswordTab;