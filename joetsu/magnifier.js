//////////////////////////////////////////////////////////////////////
///             Web Magnifier Ver1.01                              ///
///             Copyright (C) 2003 Umechando                       ///
///             http://www.umechando.com/                          ///
//////////////////////////////////////////////////////////////////////

  ie = ((document.all) && (navigator.userAgent.indexOf("Opera") < 0));
  opera = navigator.userAgent.indexOf("Opera") > -1;
  nn4 = document.layers;
  nn6 = document.getElementById;
  
  border_size = 10;
  pw = pointer_width/2;
  ph = pointer_height/2;
  differ = large_width / small_width;
  differ2 = large_height / small_height;
  vs = small_width + border_size;
  
  if(ie)
  {
    lg = document.all.large;
    pt = document.all.pointer;
    sm = document.all.small;
    cpr = document.all.copyright;
    ct = document.all.curtain;
    
    sm.style.pixelWidth = vs;
    sm.style.pixelHeight = large_height;
    sm.style.backgroundColor = background_color;
    lg.style.pixelWidth = vs;
    
    cpr.style.pixelLeft = 0;
    cpr.style.pixelTop = small_height;
    ct.style.pixelLeft = vs;
    ct.style.pixelTop = document.body.clientHeight;
    ct.style.pixelWidth = screen.width;
    ct.style.pixelHeight = large_height - document.body.clientHeight;
    ct.style.backgroundColor = background_color;
    
    window.document.onmousemove = Seekmap;
  }
  else if(opera)
  {
    lg = document.getElementById('large');
    pt = document.getElementById('pointer');
    sm = document.getElementById('small');
    cpr = document.getElementById("copyright");
    ct = document.getElementById("curtain");
        
    sm.style.width = vs
    sm.style.height = large_height;
    sm.style.backgroundColor = background_color;
    lg.style.left = vs;
    
    cpr.style.left = 0;
    cpr.style.top = small_height;
    ct.style.left = vs;
    ct.style.top = document.body.clientHeight;
    ct.style.width = screen.width;
    ct.style.height = large_height - document.body.clientHeight;
    ct.style.backgroundColor = background_color;
    
    window.document.onmousemove = Seekmap;
  }
  else if(nn4)
  {
    lg = document.layers['large'];
    pt = document.layers['pointer'];
    sm = document.layers['small'];
    cpr = document.layers["copyright"];
    ct = document.layers["curtain"];
        
    sm.resizeTo(vs, large_height);
    sm.bgColor = background_color;
    lg.moveTo(vs, 0);
    
    cpr.moveTo(0, small_height);
    ct.moveTo(vs, window.innerHeight);
    ct.resizeTo(screen.width, large_height - window.innerHeight);
    ct.bgColor = background_color;
    
    window.captureEvents(Event.MOUSEMOVE);
    window.onMouseMove = Seekmap;
  }
  else if(nn6)
  {
    lg = document.getElementById('large');
    pt = document.getElementById('pointer');
    sm = document.getElementById('small');
    cpr = document.getElementById("copyright");
    ct = document.getElementById("curtain");
    
    sm.style.width = vs + "px";
    sm.style.height = large_height + "px";
    sm.style.backgroundColor = background_color;
    lg.style.left = vs + "px";
    
    cpr.style.left = 0 + "px";
    cpr.style.top = small_height + "px";
    ct.style.left = vs + "px";
    ct.style.top = window.innerHeight + "px";
    ct.style.width = screen.width + "px";
    ct.style.height = (large_height - window.innerHeight) + "px";
    ct.style.backgroundColor = background_color;
    
    window.document.onmousemove = Seekmap;
  }
  
  function MoveX(obj, x)
  {
    if(ie) obj.style.pixelLeft = x;
    else if(opera) obj.style.left = x;
    else if(nn6) obj.style.left = x + "px";
    else if(nn4) obj.left = x;
  }

  function MoveY(obj, y)
  {
    if(ie) obj.style.pixelTop = y;
    else if(opera) obj.style.top = y;
    else if(nn6) obj.style.top = y + "px";
    else if(nn4) obj.top = y;
  }
  
 function Seekmap(e)
  {
    if(ie || opera)
    {
      var ex = event.clientX;
      var wy = event.clientY;
      
      var cw = document.body.clientWidth;
      var ch = document.body.clientHeight;
    }
    else if(nn6)
    {
      var ex = e.pageX;
      var wy = e.pageY;
      var cw = window.innerWidth;
      var ch = window.innerHeight;
    }
    else if(nn4)
    {
      var ex = e.x;
      var wy = e.y;
      var cw = window.innerWidth;
      var ch = window.innerHeight;
    }

    midW = (cw - small_width) / 2;
    midH = ch / 2;
    
    indX = midW + vs - pw;
    indY = midH - pw;
    
    byX = ex * differ;
    byY = wy * differ;
    byY2 = wy * differ2;
    
    if((ex < small_width) && (wy < small_height))
    {
      criticalX = vs + midW - byX;
      criticalY = midH - byY;
      if(criticalX < vs)
      {
        if((criticalX + large_width) < cw)
        {
          dist = byX - (large_width - cw) - pw;
          MoveX(pt, dist);
          MoveX(lg, cw - large_width);
        }
        else
        {
          MoveX(pt, indX);
          MoveX(lg, criticalX);
        }
      }
      else
      {
        dist = byX + vs - pw;
        MoveX(pt, dist);
        MoveX(lg, vs);
      }
      
      if(criticalY < 0)
      {
        if ((ch - criticalY) > large_height)
        {
          dist = byY2 - (large_height - ch) - ph;
          MoveY(pt, dist);
          MoveY(lg, ch - large_height);
        }
        else
        {
          MoveY(pt, indY);
          MoveY(lg, criticalY);
        }
      }
      else
      {
        dist = byY2 - ph;
        MoveY(pt, dist);
        MoveY(lg, 0);
      }
      if(nn4) pt.visibility = true;
      else pt.style.visibility = 'visible';
      if ((ex >= 0) && (wy >= 0))
      status = ex + ' : ' +wy;
      else status = "";
    }
    else
    {
      if(nn4) pt.visibility = false;
      else pt.style.visibility = 'hidden';
      status = "";
    }
  }
  
  function ShowHint()
  {
    URL = 'http://www1.plala.or.jp/umechan/tips/mag_hint.htm';
    WW = window.open(URL,"","width=500,height=500,left=0,top=0,resizable=yes,scrollbars=yes");
  }
  
  function CheckWindowState()
  {
    flag = true;
    cws=10;
    if(ie || opera)
    {
      cw0 = document.body.clientWidth;
      ch0 = document.body.clientHeight;
    }
    else if(nn6 || nn4)
    {
      cw0 = window.innerWidth;
      ch0 = window.innerHeight;
    }
    if (opera || nn4) CheckWindowSize();
  }
  
  function CheckWindowSize()
  {
    clearTimeout(cws);
    cws = setTimeout("CheckWindowSize()",100);
    if (opera)
    {
      cw2 = document.body.clientWidth;
      ch2 = document.body.clientHeight;
    }
    else if(nn4)
    {
      cw2 = window.innerWidth;
      ch2 = window.innerHeight;
    }
    if (flag && (cw0 != cw2 || ch0 != ch2))
    {
      flag = false;
      location.reload();
     }
  }
  
  window.onload = CheckWindowState;
