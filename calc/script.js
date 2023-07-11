class Calc {
  constructor(screen){
    //console.log('test')
    this.screen = screen
    this.screen.innerText = ''
    this.prev = ''
    this.curr = ''
    this.op = ''
    this.max_char = 10
  }

  clear(){
    this.screen.innerText = ''
    this.prev = ''
    this.curr = ''
    this.op = ''
  }

  add_number( num ){
    if( (this.prev + this.op + this.curr).length < ( this.max_char + 1 - num.toString().length ) ){

      let s = num
      if ( s === 'e' ){
        s = '2.7'
      }else if( s === 'π' ){
        s = '3.1'
      }

      if( s.includes('.') && this.curr.includes('.') ){
        s = s.replace('.','')
      }
      this.curr = this.curr + s

      if( this.curr.includes('∞') ){
        this.curr = '∞'
      }
  
      if( this.curr.length > 1 ){
        while(this.curr[0]==='0'&&this.curr.length > 1 ){
          this.curr = this.curr.replace('0','')
        }
      }

    }
    this.update()
  }

  operand( op ){
    if( this.curr === '' ){
      return
    }
    if( this.prev !== '' && this.op !== '' && this.curr !== '' ){
      this.calc()
    }
    if( (this.prev + this.op + this.curr).length < 14 ){
      if( this.prev === '' ){
        this.prev = this.curr
        this.curr = ''
      }
      this.op = op 
    }
    this.update()
  }

  operand_with_num( op, num, opnum ){
    if( this.prev !== '' && this.op !== '' && this.curr !== '' ){
      this.calc()
    }

    if( this.op === '' && this.curr === '' ){
      this.add_number(opnum)
    }else if( this.op === '' && this.curr !== '' ){
      this.operand(op) 
      this.add_number(num)
    }else{
      this.add_number(opnum)
    }

  }


  update(){
    this.screen.innerText = this.prev + this.op + this.curr 
  }

  calc(){
    if( this.prev !== '' && this.op !== '' ){
      if( this.curr == '' ){
        return
      }
      let o = this.op
      let p = parseFloat(this.prev)
      let c = parseFloat(this.curr)

            if ( o === '+' ){
        c = p + c  
      }else if ( o === '-' ){
        c = p - c  
      }else if ( o === '×' ){
        c = p * c  
      }else if ( o === '÷' ){


        c = p / c  
      }
      if( (c%1).toString().length >= 17 ){
        c = Math.round(c * 10000 ) / 10000
      }
      let C = c
      let i = '∞'
      let mi = '-' + i

      p = this.prev
      c = this.curr


      if( ( p == i || c == i ) && o == '+' ){ C = i }
      if( ( p == i && c ==mi ) && o == '+' ){ C = 0 }
      if( ( p ==mi && c == i ) && o == '+' ){ C = 0 }
      if( ( p ==mi && c ==mi ) && o == '+' ){ C =mi }


      if( ( p == i ) && o == '-' ){ C = i }
      if( ( c == i ) && o == '-' ){ C = mi }
      if( ( p == i && c ==mi ) && o == '-' ){ C = i }
      if( ( p ==mi && c == i ) && o == '-' ){ C =mi }

      if( ( p == i && c == i ) && o == '-' ){ C = 0 }
      if( ( p ==mi && c ==mi ) && o == '-' ){ C = 0 }
   

      if( ( p == i || c == i ) && o == '×' ){ C = i }

      if( ( p == i && c < 0  ) && o == '×' ){ C =mi }
      if( ( p < 0  && c == i ) && o == '×' ){ C =mi }
      if( ( p == 0 && c == i ) && o == '×' ){ C = 0 }
      if( ( p == i && c == 0 ) && o == '×' ){ C = 0 }

      if( ( p ==mi && c < 0  ) && o == '×' ){ C = i }
      if( ( p < 0  && c ==mi ) && o == '×' ){ C = i }
      if( ( p == 0 && c ==mi ) && o == '×' ){ C = 0 }
      if( ( p ==mi && c == 0 ) && o == '×' ){ C = 0 }

      if( ( p ==mi && c == i ) && o == '×' ){ C =mi }
      if( ( p == i && c ==mi ) && o == '×' ){ C =mi }
      if( ( p == i && c == i ) && o == '×' ){ C = i }
      if( ( p ==mi && c ==mi ) && o == '×' ){ C = i }


      if( ( p == i ) && o == '÷' ){ C = i }
      if( ( p ==mi ) && o == '÷' ){ C =mi }
      if( ( c == i ) && o == '÷' ){ C = 0 }
      if( ( c ==mi ) && o == '÷' ){ C = 0 }

      if( ( p == i && c < 0  ) && o == '÷' ){ C =mi }
      if( ( p ==mi && c < 0  ) && o == '÷' ){ C = i }
      if( ( p < 0  && c == i ) && o == '÷' ){ C = 0 }
      if( ( p < 0  && c ==mi ) && o == '÷' ){ C = 0 }

      if( ( p == i && c == i ) && o == '÷' ){ C = 1 }
      if( ( p ==mi && c ==mi ) && o == '÷' ){ C = 1 }
      if( ( p == i && c ==mi ) && o == '÷' ){ C =-1 }
      if( ( p ==mi && c == i ) && o == '÷' ){ C =-1 }

      if( ( p > 0  && c == 0 ) && o == '÷' ){ C = i }
      if( ( p < 0  && c == 0 ) && o == '÷' ){ C =mi }
      if( ( p == 0 && c == 0 ) && o == '÷' ){ C = 0 }

      this.curr = C.toString()
      this.prev = ''
      this.op = ''
      this.update()
    }
  }

  notcalc(){
    this.calc()
    let n = parseFloat(this.curr) || 0
    let r = n
    while( r === n ){
      r = Math.round( Math.random() * Math.floor(Math.random()*100000) ) / Math.pow(10,Math.floor(Math.random()*8))
    }
    this.curr = r.toString()
    this.update()
  }

  sqrt3(){
    if( this.prev !== '' && this.op !== '' && this.curr !== '' ){
      this.calc()
    }
    if( this.curr !== '' ){
      let c = parseFloat(this.curr)
      c = Math.cbrt(c)
      if( (c%1).toString().length >= 17 ){
        c = Math.round(c * 10000 ) / 10000
      }
      let C = c.toString()
      if( this.curr === '∞' ){
        C = '∞'
      }
      this.op = ''
      this.curr = C
      this.update()
    }
  }
};


screen = document.getElementById('screen')


numbers = document.getElementsByClassName('number')
operators = document.getElementsByClassName('operator')
eq = document.getElementById('eq')
ne = document.getElementById('ne')
sr3 = document.getElementById('sr3')

add0 = document.getElementById('add0')
min1 = document.getElementById('min1')

ac = document.getElementById('ac')

c = new Calc(screen)


for ( let element of numbers ){
  element.addEventListener('click',()=>{
    c.add_number( element.innerText ) 
  })
}

for ( let element of operators ){
  element.addEventListener('click',()=>{
    c.operand( element.innerText ) 
  })
}

eq.addEventListener('click', ()=> { c.calc() } )
ne.addEventListener('click', ()=> { c.notcalc() } )
sr3.addEventListener('click', ()=> { c.sqrt3() } )

add0.addEventListener('click',()=>{
  c.operand_with_num('+','0','0')
})

min1.addEventListener('click',()=>{
  c.operand_with_num('-','1','-1')
})

ac.addEventListener('click',()=>{
  c.clear()
})
