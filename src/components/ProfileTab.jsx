const ProfileTab = ({name, email}) => {
  return (
    <section className="flex flex-col space-y-6">
      <div>
        <h2 className="text-lg font-bold">プロフィール情報</h2>
        <p className="text-neutral-500 text-sm">現在登録されている情報を確認できます</p>
      </div>

      <fieldset className="fieldset">
        <label htmlFor="" className="label text-sm">お名前</label>
        <input type="text"  className="input w-full" value={name} disabled={true}/>

        <label htmlFor="" className="label text-sm">メールアドレス</label>
        <input type="email"  className="input w-full" value={email} disabled={true}/>
      </fieldset>

      <p className="text-sm text-neutral-500">メールアドレスやパスワードを変更する場合は、それぞれのタブから行ってください。</p>

    </section>
  )
}

export default ProfileTab;