import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;

        this.rows = 13;
        this.cols = 13;

        this.inner_walls_count = 40;
        this.walls = [];
    }

    check_connectivity(g, sx, sy, tx, ty){
        if(sx == tx && sy == ty) return true;
        g[sx][sy] = true;

        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for(let i = 0; i < 4; i++){
            let x = sx + dx[i], y = sy +dy[i];
            if(!g[x][y] && this.check_connectivity(g, x, y, tx, ty))
                return true;
        }
    }

    create_walls() {
        const g = [];
        for(let r = 0; r <this.rows; r++){
            g[r] = [];
            for(let c = 0; c <this.cols; c++){
                g[r][c] = false;
            }
        }

        //给左右俩边上墙
        for(let r = 0; r <this.rows; r++){
            g[r][0] = g[r][this.cols - 1] = true;
        }

        //上下俩行上墙
        for(let c = 0; c < this.cols; c++){
            g[0][c] = g[this.rows - 1][c] = true;
        }


        //创建随机障碍物
        for(let i = 0; i <this.inner_walls_count / 2; i++){
            for(let j = 0; j < 1000; j++){
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if(g[r][c] || g[c][r]) continue;
                if(r==this.rows -2 && c ==1 || r == 1 && c == this.cols -2) continue;

                g[r][c] = g[c][r] = true;
                break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g));
        if(!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) return false;

        for(let r = 0; r <this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                if(g[r][c]){
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }

        return true;
    }

    start() {
        for(let i = 0; i < 1000; i++){
            if(this.create_walls())
                break;
        }
    }

    // 更新地图格子的边长和画布尺寸
    update_size() {
        // 计算每个格子的边长，保证地图适应父容器
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        // 设置画布宽高为地图实际像素尺寸
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update() {
        this.update_size();
        this.render();
    }

    // 渲染地图背景
    render() {
        const color_even = "#e4eef9", color_odd = '#ffffff';
        // 遍历每一行和每一列
        for(let r = 0 ; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                // 交错填充不同颜色，实现棋盘格效果
                if((r + c) % 2 == 0){
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                // 绘制单个格子
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
        /* // 示例：填充整个画布为绿色
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); */
    }
}