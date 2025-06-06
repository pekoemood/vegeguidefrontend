import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const PasswordTab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section className="flex flex-col space-y-6">
      <div>
        <h2 className="text-lg font-bold">パスワード変更</h2>
        <p className="text-neutral-500 text-sm">セキュリティのため、定期的にパスワードを変更することをおすすめします。</p>
      </div>

      <fieldset className="fieldset space-y-4">
        <div>
          <label htmlFor="" className="label text-sm">現在のパスワード</label>
          <div className='relative'>
            <input type={`${showPassword ? 'text' : 'password'}`} placeholder="現在のパスワードを入力"  className="input w-full"/>
            <button className='absolute right-3 top-1/2 -translate-y-1/2' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={15}/> : <Eye size={15}/>}</button>
          </div>
        </div>

        <div>
          <label htmlFor="" className="label text-sm">現在のパスワード</label>
          <div className='relative'>
            <input type={`${showConfirm ? 'text' : 'password'}`} placeholder="現在のパスワードを入力"  className="input w-full"/>
            <button className='absolute right-3 top-1/2 -translate-y-1/2' onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={15}/> : <Eye size={15}/>}</button>
          </div>
        </div>
      </fieldset>

      <button className="btn btn-primary">パスワードを変更</button>
    </section>
  )
}

export default PasswordTab;