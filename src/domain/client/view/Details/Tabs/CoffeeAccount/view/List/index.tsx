import useCoffeeAccountView from './useView'

export default function CoffeeAccountView(): JSX.Element {
  const { data } = useCoffeeAccountView()
  console.log(data)
  return (
    <div>
      <p>Hello World</p>
    </div>
  )
}
